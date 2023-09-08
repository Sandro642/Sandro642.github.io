const mysql = require('mysql');

class SkymEconomyAPI {
    constructor(plugin) {
        this.plugin = plugin;
        this.connection = null;
    }

    static setPlugin(plugin) {
        DatabaseManager.instance = new DatabaseManager(plugin);
    }

    static getDatabase() {
        return DatabaseManager.instance;
    }

    getBalance(playerName, callback) {
        if (this.connection) {
            const query = 'SELECT balance FROM accounts WHERE player_name = ?';
            const values = [playerName];

            this.connection.query(query, values, (err, results) => {
                if (err) {
                    console.error('Erreur lors de l\'exécution de la requête : ' + err.stack);
                    callback(err, null);
                } else {
                    if (results.length > 0) {
                        const balance = results[0].balance;
                        callback(null, balance);
                    } else {
                        // L'utilisateur n'a pas de solde enregistré
                        callback(null, 0.0);
                    }
                }
            });
        } else {
            // Gestion de l'erreur si la connexion n'est pas ouverte
            const error = new Error('La connexion à la base de données n\'est pas ouverte.');
            callback(error, null);
        }
    }

    openConnection() {
        const host = '172.18.0.1'; // Remplacez par l'adresse de votre serveur SQL
        const database = 'SkymEconomyAPI'; // Remplacez par le nom de votre base de données
        const username = 'pmaUser'; // Remplacez par le nom d'utilisateur de votre base de données
        const password = 'h5kZ%7L50y%sGr22cU7#Oe'; // Remplacez par le mot de passe de votre base de données
        const port = 3306; // Port par défaut pour MySQL

        const config = {
            host: host,
            user: username,
            password: password,
            database: database,
            port: port
        };

        this.connection = mysql.createConnection(config);

        this.connection.connect((err) => {
            if (err) {
                console.error('Erreur lors de la connexion à la base de données : ' + err.stack);
                this.plugin.getLogger().severe('Erreur lors de la connexion à la base de données.');
                return;
            }
            console.log('Connexion à la base de données établie avec l\'ID ' + this.connection.threadId);
            this.plugin.getLogger().info('Connexion à la base de données établie.');
        });
    }

    closeConnection() {
        if (this.connection) {
            this.connection.end((err) => {
                if (err) {
                    console.error('Erreur lors de la fermeture de la connexion à la base de données : ' + err.stack);
                    this.plugin.getLogger().severe('Erreur lors de la fermeture de la connexion à la base de données.');
                    return;
                }
                console.log('Connexion à la base de données fermée.');
                this.plugin.getLogger().info('Connexion à la base de données fermée.');
            });
        }
    }
}

module.exports = SkymEconomyAPI;