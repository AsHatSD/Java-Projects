
        import java.io.*;
        import java.net.*;
        import java.util.*;

public class ServerRequests extends Thread {

    static final String HTML_START
            = "<html>" + "<title>TestServer</title>" + "<body>";

    static final String HTML_END = "</body>" + "</html>";

    Socket connectedClient = null;
    BufferedReader inFromClient = null;
    DataOutputStream outToClient = null;

    public ServerRequests(Socket client) {
        connectedClient = client;
    }

    @Override
    public void run() {

        try {

            System.out.println("The Client " + connectedClient.getInetAddress() + ":" + connectedClient.getPort() + " is connected");

            inFromClient = new BufferedReader(new InputStreamReader(connectedClient.getInputStream()));
            outToClient  = new DataOutputStream(connectedClient.getOutputStream());

            String requestString = inFromClient.readLine(); // saves input info into a string
            String headerLine    = requestString;

            StringTokenizer tokenizer = new StringTokenizer(headerLine);
            String httpMethod         = tokenizer.nextToken();
            String httpQueryString    = tokenizer.nextToken();

            StringBuilder responseBuffer = new StringBuilder();
            responseBuffer.append("<b> This is the HTTP Server Home Page.... </b><br>");
            responseBuffer.append("The HTTP Client request is ....<br>");

            System.out.println("The HTTP request string is ....");
            while (inFromClient.ready()) {
                // Read the HTTP complete HTTP Query
                responseBuffer.append(requestString).append("<br>");
                System.out.println(requestString);
                requestString = inFromClient.readLine();
            }

            if (httpMethod.equals("GET")) { // check if the type of request
                if (httpQueryString.equals("/")) { //continue forming the request
                    sendResponse(200, responseBuffer.toString(), false); //send an OK/200 request
                } else {
                    String fileName = httpQueryString.replaceFirst("/", "");
                    fileName = URLDecoder.decode(fileName,"UTF-8"); // decodes the file name
                    if (new File(fileName).isFile()) { // checks if the file with the name entered above exists
                        sendResponse(200, fileName, true); // if the file exists an OK/200 response
                    } else {
                        sendResponse(404, "<b>The Requested resource not found ...."
                                + "Usage: http://127.0.0.1:5000 or http://127.0.0.1:5000/</b>", false);
                        //send a file not found response/404 and tells you to use one of those two addresses
                    }
                }
            } else {
                sendResponse(404, "<b>The Requested resource not found ...."
                        + "Usage: http://127.0.0.1:5000 or http://127.0.0.1:5000/</b>", false);
                //send a file not found response/404 and tells you to use one of those two addresses
            }
        } catch (Exception e) {
        }
    }

    public void sendResponse(int statusCode, String responseString, boolean isFile) throws Exception {

        String statusLine = null;
        String serverdetails = "Server: Java HTTPServer";
        String contentLengthLine = null;
        String fileName = null;
        String contentTypeLine = "Content-Type: text/html" + "\r\n";
        FileInputStream fin = null;

        if (statusCode == 200) {
            statusLine = "HTTP/1.1 200 OK" + "\r\n";
        } else {
            statusLine = "HTTP/1.1 404 Not Found" + "\r\n";
        }
        //Main information about the server
        if (isFile) { // if the file exists
            fileName = responseString;
            fin = new FileInputStream(fileName); //put the file into the input stream to make it ready for transfer
            contentLengthLine = "Content-Length: " + Integer.toString(fin.available()) + "\r\n";
            if (!fileName.endsWith(".htm") && !fileName.endsWith(".html")) {
                contentTypeLine = "Content-Type: \r\n";
            }
        } else {
            responseString = ServerRequests.HTML_START + responseString + ServerRequests.HTML_END;
            contentLengthLine = "Content-Length: " + responseString.length() + "\r\n";
        }

        outToClient.writeBytes(statusLine);
        outToClient.writeBytes(serverdetails);
        outToClient.writeBytes(contentTypeLine);
        outToClient.writeBytes(contentLengthLine);
        outToClient.writeBytes("Connection: close\r\n");
        outToClient.writeBytes("\r\n");

        //tells the client all the necessary information

        if (isFile) {
            sendFile(fin, outToClient);//download file
        } else {
            outToClient.writeBytes(responseString);
        }

        outToClient.close();
    }

    public void sendFile(FileInputStream fin, DataOutputStream out) throws Exception {
        byte[] buffer = new byte[1024];
        int bytesRead;

        //transports the contents of the file into an output stream an prepares to send them to the one who made the request

        while ((bytesRead = fin.read(buffer)) != -1) {
            out.write(buffer, 0, bytesRead);
        }
        fin.close();
    }

    public static void main(String args[]) throws Exception {

        ServerSocket Server = new ServerSocket(5000, 10, InetAddress.getByName("127.0.0.1")); //Create a server socket on the localhost address
        System.out.println("TCPServer Waiting for client on port 5000"); // We are telling the client to find the server on 127.0.0.1:5000

        while (true) { // server keeps waiting for a listening for clients
            Socket connected = Server.accept();
            (new ServerRequests(connected)).start();
        }
    }
}
