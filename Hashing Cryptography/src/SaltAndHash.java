import sun.security.provider.SHA;

import java.security.*;

/**
 * Created by Grass on 11/22/2015.
 */
public class SaltAndHash {
    public static void main(String[] args) throws NoSuchAlgorithmException {
        salted();
    }

    public static void salted() throws NoSuchAlgorithmException {
        salt();
    }
    private static String salt() throws NoSuchAlgorithmException {
        //Always use a SecureRandom generator
        SecureRandom sr = SecureRandom.getInstance("SHA1PRNG");
        //Create array for salt
        byte[] salt = new byte[16];
        //Get a random salt
        sr.nextBytes(salt);
        //return salt
        return salt.toString();
    }
}
