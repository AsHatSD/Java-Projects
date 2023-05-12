/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package phs.Classes;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * @author Boznea, Stefan Dimitriu, Alexandru Lazaroiu, Bogdan Nedelea
 */
public class Database {

    /**
     * @param args the command line arguments
     * @throws java.lang.ClassNotFoundException
     * @throws java.sql.SQLException
     */
    public static void main(String[] args) throws ClassNotFoundException, SQLException {
        
        
        update2(1,"red");
    }
    
    public static void update2(int id, String verde) throws SQLException {
        try {//set (subject, priority, status, comment)
            Connection conn = DBConnector.getConnection();
            String query = "UPDATE color SET colour = ? WHERE id = ?";

            System.out.println(query);
            try (PreparedStatement pstmt = conn.prepareStatement(query)) {
                pstmt.setString(1, verde);
                pstmt.setInt(2, id);
                pstmt.executeUpdate();
            }

        } catch (SQLException ex) {
            Logger.getLogger(Database.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
    
    public static void select(int name) throws ClassNotFoundException {
        try {
            Connection conn = DBConnector.getConnection();
            //name = name.replaceAll("'", "");// ' " Let's. Hello "Duck"

            String sql = "SELECT * FROM color WHERE id = ?;";

            System.out.println(sql);
            PreparedStatement pstmt = conn.prepareStatement(sql);
            pstmt.setInt(1, name);
            pstmt.executeQuery();

            ResultSet rs = pstmt.getResultSet();
            while (rs.next()) {
                int id = rs.getInt("id");
                String color = rs.getString("MColor");
                System.out.println("id=" + id + " color = " + color);
            }

        } catch (SQLException ex) {
            Logger.getLogger(Database.class.getName()).log(Level.SEVERE, null, ex);
        }
        System.out.println("------------End-----------");
    }

    public static void insert(String subject, String priority, String status, String comment) throws ClassNotFoundException {
        try {
            Connection conn = DBConnector.getConnection();
            //INSERT INTO `firstdb`.`person` (`idPerson`, `Name`, `Address`) VALUES (NULL, 'Bob', 'test');
            String sql = "INSERT INTO info (subject, priority, status, comment) VALUES (?, ? , ? , ?);";

            System.out.println(sql);
            PreparedStatement pstmt = conn.prepareStatement(sql);
            pstmt.setString(1, subject);
            pstmt.setString(2, priority);
            pstmt.setString(3, status);
            pstmt.setString(4, comment);
            pstmt.execute();
        } catch (SQLException ex) {
            Logger.getLogger(Database.class.getName()).log(Level.SEVERE, null, ex);
        }
        System.out.println("------------End-----------");
    }

    public static void delete(int id) throws SQLException {
        try {
            Connection conn = DBConnector.getConnection();
            String query = "DELETE FROM info where id = ?";
            PreparedStatement pstmt = conn.prepareStatement(query);
            pstmt.setInt(1, id);
            pstmt.execute();
        } catch (SQLException ex) {
            Logger.getLogger(Database.class.getName()).log(Level.SEVERE, null, ex);
        }
        System.out.println("------------End-----------");
    }

    public static void update(int id,String subject, String priority, String status, String comment) throws SQLException {
        try {//set (subject, priority, status, comment)
            Connection conn = DBConnector.getConnection();
            String query = "UPDATE info SET subject = ?, priority = ?, status = ?, comment = ? WHERE id = ?";
            
            System.out.println(query);
            try (PreparedStatement pstmt = conn.prepareStatement(query)) {
                pstmt.setString(1, subject);
                pstmt.setString(2, priority);
                pstmt.setString(3, status);
                pstmt.setString(4, comment);
                pstmt.setInt(5, id);
                pstmt.executeUpdate();
            }
           
            
        }
        catch (SQLException ex) {
            Logger.getLogger(Database.class.getName()).log(Level.SEVERE, null, ex);
        }
        System.out.println("------------End-----------");
    }
}
