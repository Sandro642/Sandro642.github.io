#!/bin/bash

# Chemin du dossier parent
parent_folder="MineWatchAPI"

# Supprimer le dossier parent s'il existe
if [ -d "$parent_folder" ]; then
    echo "Suppression du dossier parent : $parent_folder"
    rm -fr "$parent_folder"
fi

# Cloner le repo depuis GitHub
repo_url="https://github.com/Sandro642/MineWatchAPI.git"
echo "Clonage du repo depuis $repo_url"
git clone "$repo_url" "$parent_folder"

echo "Mise à jour terminée."

file="updaterapi.sh"
# Supprimer le fichier
    echo "Suppression du fichier : $file"
    rm -r "$file"