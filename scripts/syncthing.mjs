import { $ } from 'execa'

$`syncthing`.pipeStdout('stdout.txt')
$`syncthing --gui-address=127.0.0.1:3006 --home ./Sync-more`.pipeStdout('stdout2.txt')
