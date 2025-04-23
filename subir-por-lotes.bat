@echo off
chcp 65001 >nul
setlocal enabledelayedexpansion

set "batchSize=30"
set "fileCount=0"
set "filesAdded=0"
set "commitCounter=1"

rem Crear un archivo temporal para la lista de archivos sin stagear
git status --porcelain > .git_unstaged_files.tmp

rem Contar el número de archivos sin seguimiento en el archivo temporal
for /f "tokens=1" %%i in ('type ".git_unstaged_files.tmp" ^| findstr /B /C:"??"') do (
    set /a fileCount+=1
)

echo Se encontraron !fileCount! archivos sin seguimiento según git status --porcelain.

if !fileCount! gtr 0 (
    echo Iniciando el proceso de agregar, commitear y pushear en lotes de !batchSize! archivos.
    for /f "delims=" %%a in ('type ".git_unstaged_files.tmp" ^| findstr /B /C:"?? "') do (
        set "line=%%a"
        set "filePath=!line:~3!"
        if "!filePath!" NEQ "" (
            echo git add "!filePath!"
            git add "!filePath!"
            set /a filesAdded+=1

            if !filesAdded! equ !batchSize! (
                echo.
                echo Realizando commit lote !commitCounter!...
                git commit -m "Añadiendo lote de archivos sin seguimiento !commitCounter!"
                echo.
                echo Realizando push a origin main...
                git push origin main
                echo.
                echo Lote !commitCounter! commiteado y pusheado.
                set "filesAdded=0"
                set /a commitCounter+=1
                echo Esperando 5 segundos antes del siguiente lote...
                timeout /t 5 /nobreak >nul
            )
        )
    )

    rem Procesar el último lote si hay archivos restantes
    if !filesAdded! gtr 0 (
        echo.
        echo Realizando commit del último lote !commitCounter!...
        git commit -m "Añadiendo último lote de archivos sin seguimiento !commitCounter!"
        echo.
        echo Realizando push a origin main...
        git push origin main
        echo.
        echo Último lote commiteado y pusheado.
    )
) else (
    echo No se encontraron archivos sin seguimiento para agregar.
)

del .git_unstaged_files.tmp
endlocal
goto :eof