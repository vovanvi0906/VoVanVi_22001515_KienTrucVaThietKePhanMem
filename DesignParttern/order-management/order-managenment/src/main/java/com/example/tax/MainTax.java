package com.example.tax;

import com.example.tax.context.Product;
import com.example.tax.decorator.BasicProduct;
import com.example.tax.decorator.EnvironmentalFeeDecorator;
import com.example.tax.decorator.PackagingFeeDecorator;
import com.example.tax.decorator.ProductComponent;
import com.example.tax.state.ExemptProductState;
import com.example.tax.state.ImportedProductState;
import com.example.tax.state.LuxuryProductState;
import com.example.tax.strategy.ConsumptionTaxStrategy;
import com.example.tax.strategy.LuxuryTaxStrategy;
import com.example.tax.strategy.NoTaxStrategy;
import com.example.tax.strategy.TaxStrategy;
import com.example.tax.strategy.VATTaxStrategy;

public class MainTax {
    public static void main(String[] args) {
        ProductComponent product = new BasicProduct("Nước hoa", 500);
        product = new PackagingFeeDecorator(product);
        product = new EnvironmentalFeeDecorator(product);

        TaxStrategy taxStrategy = new VATTaxStrategy();
        Product p = new Product(product, taxStrategy);

        p.processTax();
        System.out.println();

        p.setState(new ImportedProductState());
        p.setTaxStrategy(new ConsumptionTaxStrategy());
        p.processTax();
        System.out.println();

        p.setState(new LuxuryProductState());
        p.setTaxStrategy(new LuxuryTaxStrategy());
        p.processTax();
        System.out.println();

        p.setState(new ExemptProductState());
        p.setTaxStrategy(new NoTaxStrategy());
        p.processTax();
    }
}

//State dùng để biểu diễn từng loại/trạng thái sản phẩm khác nhau.
//Strategy dùng để thay đổi công thức tính thuế linh hoạt.
//Decorator dùng để bổ sung các loại phí khác vào giá sản phẩm mà không sửa lớp gốc.