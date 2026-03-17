package factory;

import product.Chair;
import product.Sofa;
import product.CoffeeTable;

public interface FurnitureFactory {
    Chair createChair();
    Sofa createSofa();
    CoffeeTable createCoffeeTable();
}