package com.ufcg.si1.dataBaseOperations;
import com.ufcg.si1.repositories.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import com.ufcg.si1.model.*;

@Component
public class DataBaseOperations {

    @Autowired
    private ProductRepository productRepository;

    private static DataBaseOperations dataBaseOperations;

    private DataBaseOperations() {}

    public static DataBaseOperations getDataBaseOperations() {

        if (dataBaseOperations == null) {
            dataBaseOperations = new DataBaseOperations();
        }

        return dataBaseOperations;
    }

    public Produto saveProduct(Produto product) {
        return productRepository.save(product);
    }

    public Produto getProduct(String barCode) {
        return productRepository.findOne(barCode);
    }
}