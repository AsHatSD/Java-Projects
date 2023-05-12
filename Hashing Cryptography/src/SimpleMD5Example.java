import java.security.*;

public class SimpleMD5Example {
    public static void main(String[] args) {
        String passwordToHash;
        for(char value='a';value<='z';value++) {
            for (char value2 = 'a'; value2 <= 'z'; value2++) {
                for (char value3 = 'a'; value3 <= 'z'; value3++) {
                    for (char value4 = 'a'; value4 <= 'z'; value4++) {
                        for (char value5 = 'a'; value5 <= 'z'; value5++) {
                            for (char value6 = 'a'; value6 <= 'z'; value6++) {
                                for (char value7 = 'a'; value7 <= 'z'; value7++) {
                                    for (char value8 = 'a'; value8 <= 'z'; value8++) {
                                        passwordToHash = String.valueOf(value + value2 + value3 + value4 + value5 + value6 + value7 + value8);
                                        if(hash(passwordToHash).contains("619aa4aecd12370af617e244d9e14fd8"))
                                            System.out.println(passwordToHash);
                                        break;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    public static String hash(String passwordToHash){
        String generatedPassword = null;
        try {
            MessageDigest md = MessageDigest.getInstance("MD5");
            md.update(passwordToHash.getBytes());
            byte[] bytes = md.digest();
            StringBuilder sb = new StringBuilder();
            for(int i=0; i< bytes.length ;i++)
            {
                sb.append(Integer.toString((bytes[i] & 0xff) + 0x100, 16).substring(1));
            }
            generatedPassword = sb.toString();
        }
        catch (NoSuchAlgorithmException e)
        {
            e.printStackTrace();
        }
        return generatedPassword;
    }
}