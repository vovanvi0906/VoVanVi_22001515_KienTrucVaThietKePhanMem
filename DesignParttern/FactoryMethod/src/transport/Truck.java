package transport;

public class Truck implements Transport {
    @Override
    public void deliver() {
        System.out.println("Giao hàng bằng xe tải 🚚");
    }
}