package logistics;

import transport.Transport;

public abstract class Logistics {

    // Factory Method (quan trọng)
    public abstract Transport createTransport();

    public void planDelivery() {
        Transport t = createTransport();
        t.deliver();
    }
}