import React, { Fragment } from 'react'
import './index.css'
interface Heading {
  depth: number
  value: string
  url: string
}

export interface TOCAsideProps {
  toc: Heading[]
  indentDepth?: number
  fromHeading?: number
  toHeading?: number
  asDisclosure?: boolean
  exclude?: string | string[]
}

type TreeNode = Heading & {
  children: TreeNode[] | Heading[]
  parent: TreeNode | null
}

/**
   * 
   * @param list 
   * @example [
        { value: 'vuejs [2.X] 的理解', url: '#vuejs-2x-的理解', depth: 2 },
        { value: '模板语法', url: '#模板语法', depth: 2 },
        { value: 'vue  object', url: '#vue--object', depth: 2 },
        { value: 'template', url: '#template', depth: 4 },
   */
const buildTree = function (list: Heading[]) {
  const baseDepth = 0
  const rootNode: TreeNode = {
    value: '目录',
    url: '#',
    depth: baseDepth,
    children: [],
    parent: null,
  }
  let depth = baseDepth
  let firstNode = rootNode
  list.forEach((node: TreeNode, index) => {
    if (node.depth > depth) {
      if (!firstNode.children) {
        firstNode.children = []
      }
      firstNode.children.push(node)
      node!.parent = firstNode
    } else if (node.depth == depth) {
      firstNode.parent!.children.push(node)
      node.parent = firstNode.parent
    } else {
      const aboveLevelNode = getAboveLevelNode(list[index - 1], node.depth)
      aboveLevelNode.children.push(node)
      node.parent = aboveLevelNode
    }
    // update state
    firstNode = node
    depth = node.depth
  })
  return rootNode
}

function getAboveLevelNode(node, depth) {
  let parentNode = node.parent
  while (parentNode) {
    if (parentNode.depth < depth) {
      return parentNode
    }
    parentNode = parentNode.parent
  }
  return null
}

const TOCAside: React.FC<TOCAsideProps> = ({
  toc,
  fromHeading = 1,
  toHeading = 6,
  exclude = '',
}) => {
  const re = Array.isArray(exclude)
    ? new RegExp('^(' + exclude.join('|') + ')$', 'i')
    : new RegExp('^(' + exclude + ')$', 'i')
  const filteredToc = toc.filter(
    (heading) =>
      heading.depth >= fromHeading && heading.depth <= toHeading && !re.test(heading.value)
  )

  const getTocList = function (node) {
    if (node.children) {
      return (
        <Fragment>
          <details open>
            <summary className="ml-6 overflow-x-visible whitespace-nowrap pb-2 pt-2 text-base font-bold">
              <a
                href={node.url}
                style={{
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                  display: 'inline',
                  width: '200px',
                  textOverflow: 'ellipsis',
                }}
              >
                {node.value}
              </a>
            </summary>
            <ul className="ml-6">
              {node.children.map((child) => (
                <li key={child.value}>{getTocList(child)}</li>
              ))}
            </ul>
          </details>
        </Fragment>
      )
    }

    return (
      <a
        href={node.url}
        style={{
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          display: 'inline-block',
          maxWidth: '120px',
          textOverflow: 'ellipsis',
        }}
      >
        {node.value}
      </a>
    )
  }

  const rootNode = buildTree(filteredToc)
  return (
    <div
      className="toc-tree overflow-y-auto"
      style={{
        maxHeight: '90vh',
        overflowX: 'visible',
      }}
    >
      {getTocList(rootNode)}
    </div>
  )
}

export default TOCAside
