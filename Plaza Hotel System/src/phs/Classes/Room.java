package phs.Classes;
/**
 *
 * @author Boznea, Stefan Dimitriu, Alexandru Lazaroiu, Bogdan Nedelea
 */
public class Room
{
    private int              room;
    private String           customer_name;
    private String checkin;    //SimpleDateFormat
    private String checkout;   //SimpleDateFormat
    private Double           total_sum;
    
    public Room(int room, String customer_name, String checkin,String checkout,Double total_sum) {
      
        this.room          = room;
        this.customer_name = customer_name;
        this.checkin       = checkin;
        this.checkout      = checkout;
        this.total_sum     = total_sum;
    }

    public Room() {
        this(0," "," "," ",0.0);
    }
    
    
    public int getRoom() {
        return room;
    }
 
    public void setRoom_nr(int room) {
        this.room=room;
    }

    public String getCustomer_name() {
        return customer_name;
    }
    
    public void setCustomer_name(String customer_name) {
        this.customer_name = customer_name;
    }
    
    public String getCheckin() {
        return checkin;
    }

    public void setCheckin(String checkin) {
        this.checkin = checkin;
    }
    
    public String getCheckout() {
        return checkout;
    }

    public void setCheckout(String checkout) {
        this.checkout = checkout;
    }
    
    public Double getTotal_sum() {
        return total_sum;
    }

    public void setTotal_sum(Double total_sum) {
        this.total_sum = total_sum;
    }
    
    @Override
    public String toString() {
        return room + " " + customer_name + " "+ checkin + " " + checkout + " " + total_sum;
    }
    
}
