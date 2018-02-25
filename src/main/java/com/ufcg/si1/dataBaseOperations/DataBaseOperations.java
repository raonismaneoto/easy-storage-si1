package com.ufcg.si1.dataBaseOperations;
import com.ufcg.si1.repositories.ProductRepository;
import com.ufcg.si1.repositories.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import com.ufcg.si1.model.*;

@Component
public class DataBaseOperations {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private UserRepository userRepository;

    private static DataBaseOperations dataBaseOperations;

    private DataBaseOperations() {}

    public static DataBaseOperations getDataBaseOperations() {

        if (dataBaseOperations == null) {
            dataBaseOperations = new DataBaseOperations();
        }

        return dataBaseOperations;
    }

    public Product saveProduct(Product product) {
        return productRepository.save(product);
    }

    public Product getProduct(String barCode) {
        return productRepository.findOne(barCode);
    }

    public User getUser(String username) {
        return userRepository.findOne(username);
    }

    public User saveUser(User user) {
        return userRepository.save(user);
    }
}