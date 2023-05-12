package sample;
import javafx.fxml.FXML;
import javafx.scene.control.*;
import javafx.scene.image.Image;
import javafx.scene.image.ImageView;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.util.Random;
import java.util.Scanner;

public class Controller {

    @FXML
    private Label  SecondaryTitle;
    @FXML
    private Label  PageText;
    @FXML
    private Button Refresh;
    @FXML
    private ImageView Photo;

    String [] Titles = new String [15];
    String [] Categories = new String[5];

    public void LoadCategory(){
        Categories[0]="Alcohol";
        Categories[1]="Animals";
        Categories[2]="FootBall";
        Categories[3]="Politics";
        Categories[4]="War";
    }
    public void LoadText(){
        Random rand = new Random();
        int n = rand.nextInt();

        Scanner file = null;
        String text ="";
        String randuri="";

        try
        {
            file = new Scanner(new FileReader("src/WalmartXbox.txt"));
        }
        catch (FileNotFoundException e)
        {
            e.printStackTrace();
        }
        while(file.hasNext()){
             randuri = file.nextLine();
             text+=randuri;
        }
        PageText.setText(text);
        file.close();

    }

    public void LoadPicture(){
        File file = new File("src/img/Alcool/Photos/Alcool1.jpg");
        Image image = new Image(file.toURI().toString());
        Photo.setImage(image);
    }

    public void LoadTitles(){
        Scanner file = null;
        String title = null;
        int length=0;
        try
        {
            file = new Scanner(new FileReader("Titles.txt"));
        }
        catch (FileNotFoundException e)
        {
            e.printStackTrace();
        }
        while(file.hasNext() && length<Titles.length){

            title = file.nextLine();

            if(title!=null) {
                Titles[length] = title;
                length++;
            }
        }
        file.close();
    }

    @FXML
    public void ChangeArticle(){
        LoadTitles();
        LoadText();
        LoadPicture();
        Random rand = new Random();
        int  n = rand.nextInt(Titles.length);
        SecondaryTitle.setText(Titles[n]);
    }
}
