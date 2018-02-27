package com.ufcg.si1.dataBaseOperations;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.ufcg.si1.model.Batch;
import com.ufcg.si1.model.Product;
import com.ufcg.si1.model.User;
import com.ufcg.si1.repositories.BatchRepository;
import com.ufcg.si1.repositories.ProductRepository;
import com.ufcg.si1.repositories.UserRepository;

@Component
public class DataBaseOperations {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private BatchRepository batchRepository;
    
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

    //Database operations for Products
    public List<Product> findAllProducts() {
    	return productRepository.findAll();
    }
    
    public Product saveProduct(Product product) {
        return productRepository.save(product);
    }

    public Product findProduct(String barCode) {
        return productRepository.findOne(barCode);
    }
    
    public void deleteProduct(String barCode) {
    	productRepository.delete(barCode);
    }
    
    //Database operations for Batchs
    public List<Batch> findAllBatchs() {
    	return batchRepository.findAll();
    }
    
    public Batch saveBatch(Batch batch) {
        return batchRepository.save(batch);
    }

    public List<Batch> getBatchesByProduct(Product product) {
        return batchRepository.findByProduct(product);
    }

    //Database operations for User
    public User getUser(String username) {
        return userRepository.findOne(username);
    }

    public User saveUser(User user) {
        return userRepository.save(user);
    }
}