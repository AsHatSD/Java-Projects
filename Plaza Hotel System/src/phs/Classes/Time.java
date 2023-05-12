/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package phs.Classes;
import java.text.SimpleDateFormat;
import java.util.Calendar;
/**
 *
 * @author Boznea, Stefan Dimitriu, Alexandru Lazaroiu, Bogdan Nedelea
 */
public class Time {
      public static void main(String[] args) {
    	Calendar cal = Calendar.getInstance();
    	cal.getTime();
    	SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
    	System.out.println( sdf.format(cal.getTime()) );
    }
}
