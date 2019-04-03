while true; do ps ax -o pid,rss,command | grep "[n]oded"; sleep .3; done

while true; do ps ax -o pid,rss,command | grep "[g]onow"; sleep .3; done

while true; do ps ax -o pid,rss,command | grep "[b]ooted"; sleep .3; done

while true; do ps ax -o pid,rss,command | grep "[q]uarked"; sleep .3; done