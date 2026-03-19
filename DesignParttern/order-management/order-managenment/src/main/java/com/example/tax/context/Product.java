package com.example.tax.context;

import com.example.tax.decorator.ProductComponent;
import com.example.tax.state.NormalProductState;
import com.example.tax.state.ProductState;
import com.example.tax.strategy.TaxStrategy;

public class Product {
    private ProductState state;
    private TaxStrategy taxStrategy;
    private ProductComponent productComponent;

    public Product(ProductComponent productComponent, TaxStrategy taxStrategy) {
        this.productComponent = productComponent;
        this.taxStrategy = taxStrategy;
        this.state = new NormalProductState();
    }

    public void setState(ProductState state) {
        this.state = state;
    }

    public void setTaxStrategy(TaxStrategy taxStrategy) {
        this.taxStrategy = taxStrategy;
    }

    public void processTax() {
        System.out.println("== Trạng thái sản phẩm: " + state.getStateName() + " ==");
        state.handle(this);

        double price = productComponent.getPrice();
        double tax = taxStrategy.calculateTax(price);
        double total = price + tax;

        System.out.println("Mô tả: " + productComponent.getDescription());
        System.out.println("Giá gốc sau phí bổ sung: " + price);
        System.out.println("Loại thuế: " + taxStrategy.getTaxName());
        System.out.println("Tiền thuế: " + tax);
        System.out.println("Tổng tiền sau thuế: " + total);
    }
}