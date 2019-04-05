while true; do ps ax -o pid,rss,command | grep "[n]oded"; sleep .3; done

while true; do ps ax -o pid,rss,command | grep "[g]onow"; sleep .3; done

while true; do ps ax -o pid,rss,command | grep "[b]ooted"; sleep .3; done

while true; do ps ax -o pid,rss,command | grep "[q]uarked"; sleep .3; done

OR

alias ps-rss='ps ax -o pid,rss,command | numfmt --header --from-unit=1024 --to=iec --field 2|grep -v grep'

ps-rss | grep "whatever"

