/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package phs.Classes;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

/**
 *
 * @author Boznea, Stefan Dimitriu, Alexandru Lazaroiu, Bogdan Nedelea
 */
public class DBConnector {
    private static final String USER = "root";
    private static final String PASS = "database7395";
    private static final String DB   = "hotel_rooms";
    private static final String URL  = "jdbc:mysql://localhost";
    private static final String PORT = "3306";
    
     public static Connection getConnection() {
        Connection conn = null;
        try {
            Class.forName("com.mysql.jdbc.Driver");
            //jdbc:mysql://localhost:3306/firstdb
            String urlForConn = URL + ":" + PORT + "/" + DB;
            conn = DriverManager.getConnection(urlForConn, USER, PASS);
        } catch (ClassNotFoundException | SQLException ex) {
            //Logger.getLogger(DBConnector.class.getName()).log(Level.SEVERE, null, ex);
            System.out.println("[ERR] "+ex.getMessage());
        } 
        return conn;
    }
}
