package com.ufcg.si1.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ufcg.si1.dataBaseOperations.DataBaseOperations;
import com.ufcg.si1.model.Product;
import com.ufcg.si1.model.ProductQuantityPair;
import com.ufcg.si1.model.Sale;
import java.util.List;

@Service("saleService")
public class SaleServiceImpl implements SaleService {
    
    @Autowired
    private DataBaseOperations dataBaseOperations;

    @Override
    public Sale saveSale(Sale sale) {
        decreaseProductsQuantity(sale);
        return dataBaseOperations.saveSale(sale);
    }

    @Override
    public Sale getSale(long id) {
        return dataBaseOperations.getSale(id);
    }

    @Override
    public List<Sale> getSales() {
        return dataBaseOperations.getSales();
    }

    @Override
    public void deleteSale(long id) {
        increaseProductsQuantity(dataBaseOperations.getSale(id));
        dataBaseOperations.deleteSale(id);
    }

    private void decreaseProductsQuantity(Sale sale) {
        for(ProductQuantityPair pair: sale.getProductsQuantity()) {
            Product product = dataBaseOperations.findProduct(pair.getBarCode());
            product.setQuantity(product.getQuantity() - pair.getQuantity());
            dataBaseOperations.saveProduct(product);
        }
    }

    private void increaseProductsQuantity(Sale sale) {
        for(ProductQuantityPair pair: sale.getProductsQuantity()) {
            Product product = dataBaseOperations.findProduct(pair.getBarCode());
            product.setQuantity(product.getQuantity() + pair.getQuantity());
            dataBaseOperations.saveProduct(product);
        }
    }

}