import logistics.Logistics;
import logistics.RoadLogistics;
import logistics.SeaLogistics;

public class Main {
    public static void main(String[] args) {

        Logistics logistics;

        // chọn loại vận chuyển
        String type = "road"; // đổi thành "sea" để test

        if (type.equalsIgnoreCase("road")) {
            logistics = new RoadLogistics();
        } else {
            logistics = new SeaLogistics();
        }

        logistics.planDelivery();
    }
}