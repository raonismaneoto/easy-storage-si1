package com.ufcg.si1.service;

import com.ufcg.si1.model.Category;
import com.ufcg.si1.model.Product;
import com.ufcg.si1.model.DTO.ProductDTO;
import java.util.List;



public interface CategoryService {

    Category saveCategory(Category category);

    Category getCategory(String id);

    Category updateCategory(Category category);

    ProductDTO createProductDTO(Product product);

    List<ProductDTO> createProductDTOs (List<Product> products);

	List<Category> getAll();
}