import factory.*;
import product.*;

public class Main {
    public static void main(String[] args) {

        FurnitureFactory factory;

        String style = "modern"; // đổi thành victorian

        if (style.equalsIgnoreCase("modern")) {
            factory = new ModernFurnitureFactory();
        } else {
            factory = new VictorianFurnitureFactory();
        }

        Chair chair = factory.createChair();
        Sofa sofa = factory.createSofa();
        CoffeeTable table = factory.createCoffeeTable();

        chair.sitOn();
        sofa.lieOn();
        table.use();
    }
}