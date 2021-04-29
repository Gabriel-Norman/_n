# 🚀 Tips & Tricks per l'utilizzo di questo tema 🚀

_n boilerplate


### Comandi via Node.js:

1. installare gulp-cli localmente prima di entrare nel progetto
    *  npm install gulp-cli -g  *
2. nel file gulpfile.js alla voce "proxy:" configurare con la directory del tema da sviluppare
    *  http://localhost:8888/...  *
3. all'interno del progetto inizializzare i moduli npm
    *  npm install  *
4. inizializzare il comando per il browsersync dei file css/js
    *  gulp watch  *
5. quando sei pronto per mettere il sito online
    *  gulp compile  *

Per poter rifare il comando gulp compile, eliminare la cartella precedentemente creata


### Decompilatore SASS online

https://www.sassmeister.com/


### Impostazioni per usare woocommerce e jetpack

1. eliminare l'underline prima del file ./sass/_woocommerce.sass per poter attivare il css
2. decommentare la funzione di compatibilità di woocommerce nel functions.php alla riga 230
3. se necessario l'infinite scroll di jetpack, attivare il componente css decommentando la linea in ./sass/style.sass



### Struttura file e templates



### Funzioni utili per il functions.php
