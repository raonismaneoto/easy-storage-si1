package com.ufcg.si1.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ufcg.si1.dataBaseOperations.DataBaseOperations;
import com.ufcg.si1.model.Category;
import com.ufcg.si1.model.Product;
import com.ufcg.si1.model.DTO.ProductDTO;
import java.util.ArrayList;
import java.util.List;


@Service("categoryService")
public class CategoryServiceImpl implements CategoryService {
    
    @Autowired
    private DataBaseOperations dataBaseOperations;

    @Override
    public Category saveCategory(Category category) {
        return dataBaseOperations.saveCategory(category);
    }

    @Override
    public Category getCategory(String categoryName) {
        return dataBaseOperations.getCategory(categoryName);
    }
    
    @Override
    public Category updateCategory(Category category) {
        return dataBaseOperations.updateCategory(category);
    }

    @Override
	public ProductDTO createProductDTO(Product product) {
        String categoryName = product.getCategory();
        Category category = getCategory(categoryName);
        ProductDTO productDTO = new ProductDTO(product, category);
        return productDTO;
	}

	@Override
	public List<ProductDTO> createProductDTOs(List<Product> products) {
		List<ProductDTO> productDTOs = new ArrayList<ProductDTO>();
		for (Product product : products) {
            ProductDTO productDTO = createProductDTO(product);
            productDTOs.add(productDTO);
        }
        return productDTOs;
	}

	@Override
	public List<Category> getAll() {
		return dataBaseOperations.findAllCategories();
	}
}