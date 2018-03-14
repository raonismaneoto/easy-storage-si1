package com.ufcg.si1.dataBaseOperations;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.ufcg.si1.model.Batch;
import com.ufcg.si1.model.Product;
import com.ufcg.si1.model.User;
import com.ufcg.si1.model.Sale;
import com.ufcg.si1.repositories.BatchRepository;
import com.ufcg.si1.repositories.ProductQuantityPairRepository;
import com.ufcg.si1.repositories.ProductRepository;
import com.ufcg.si1.repositories.SaleRepository;
import com.ufcg.si1.repositories.UserRepository;
import com.ufcg.si1.model.ProductQuantityPair;

@Component
public class DataBaseOperations {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private BatchRepository batchRepository;
    
    @Autowired
    private UserRepository userRepository;

    @Autowired 
    private SaleRepository saleRepository;

    @Autowired
    private ProductQuantityPairRepository productQuantityRepository;

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
    public List<Batch> findAllBatches() {
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

    //Database operations for sale
    public Sale getSale(long id) {
        return saleRepository.findOne(id);
    }

    public Sale saveSale(Sale sale) {
        return saleRepository.save(sale);
    }

    public void deleteSale(long id) {
        saleRepository.delete(id);
    }

    public List<Sale> getSales() {
        return saleRepository.findAll();
    }

    //Database operations for productQuantityPair
    public ProductQuantityPair getProductQuantityPair(long id) {
        return this.productQuantityRepository.findOne(id);
    }

    public ProductQuantityPair saveProductQuantityPair(ProductQuantityPair pair) {
        return productQuantityRepository.save(pair);
    }
}