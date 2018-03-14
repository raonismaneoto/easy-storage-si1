package com.ufcg.si1.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import com.ufcg.si1.model.Batch;
import com.ufcg.si1.model.Category;
import com.ufcg.si1.model.Product;
import com.ufcg.si1.model.DTO.BatchDTO;
import com.ufcg.si1.model.DTO.ProductDTO;
import com.ufcg.si1.service.CategoryServiceImpl;
import com.ufcg.si1.service.CategoryService;
import com.ufcg.si1.service.ProductBatchService;
import com.ufcg.si1.service.ProductBatchServiceImpl;
import com.ufcg.si1.util.CustomErrorType;

@RestController
@RequestMapping("/api/product")
public class ProductController {

	@Autowired
	ProductBatchService productBatchService = new ProductBatchServiceImpl();

	@Autowired
	CategoryService categoryService = new CategoryServiceImpl();



	

	@RequestMapping(value = "/findAll", method = RequestMethod.GET)
	public ResponseEntity<List<ProductDTO>> listAllProducts() {
		List<Product> products = productBatchService.findAllProducts();
		List<ProductDTO> productsDTOs = categoryService.createProductDTOs(products);
		if (products.isEmpty()) {
			return new ResponseEntity(HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<List<ProductDTO>>(productsDTOs, HttpStatus.OK);
	}

	@RequestMapping(value = "/create", method = RequestMethod.POST)
	public ResponseEntity<ProductDTO> createProduct(@RequestBody ProductDTO productDTO, UriComponentsBuilder ucBuilder) {
		if (productBatchService.productAlreadyExists(productDTO.getBarCode())) {
			return new ResponseEntity(new CustomErrorType("Problem with Product creation"), HttpStatus.CONFLICT);
		}

		Product product = new Product(productDTO);
		Category category = new Category(productDTO);
		productBatchService.saveProduct(product);
		categoryService.saveCategory(category);
		return new ResponseEntity<ProductDTO>(productDTO, HttpStatus.CREATED);
	}

	@RequestMapping(value = "/update/{barCode}", method = RequestMethod.PUT)
	public ResponseEntity<?> updateProduct(@PathVariable("barCode") String barCode, @RequestBody ProductDTO productDTO) {
		if (!productBatchService.productAlreadyExists(barCode)) {
			return new ResponseEntity(new CustomErrorType("Problem with Product update"), HttpStatus.CONFLICT);
		}
		Product product = new Product(productDTO);
		product = productBatchService.updateProduct(product);
		return new ResponseEntity<ProductDTO>(productDTO, HttpStatus.OK);
	}

	@RequestMapping(value = "/batch/create/{barCode}", method = RequestMethod.POST)
	public ResponseEntity<BatchDTO> createBatch(@PathVariable("barCode") String barCode, @RequestBody BatchDTO batchDTO) {
		Product product = productBatchService.findProductByBarCode(barCode);
		if (product == null) {
			return new ResponseEntity(new CustomErrorType("Unable to create batch. Product not found."),
					HttpStatus.NOT_FOUND);
		}
		Batch batch = new Batch(product, batchDTO.getNumberOfItems(), batchDTO.getExpirationDate());
		product.setQuantity(product.getQuantity() + batch.getNumberOfItems());
		productBatchService.makeProductAvailable(product);
		productBatchService.saveProduct(product);
		productBatchService.saveBatch(batch);
		return new ResponseEntity<BatchDTO>(batchDTO, HttpStatus.CREATED);
	}

	@RequestMapping(value = "/batch/{id}", method = RequestMethod.DELETE)
	public void deleteBatch(@PathVariable long id) {
		productBatchService.deleteBatch(id);
	}

	@RequestMapping(value="/batch/{barCode}", method = RequestMethod.GET)
	public ResponseEntity<List<Batch>> getBatchesByProduct(@PathVariable("barCode") String barCode) {
		Product product = productBatchService.findProductByBarCode(barCode);
		if (product == null) {
			return new ResponseEntity(new CustomErrorType("Unable to find batch. Product not found."),
					HttpStatus.NOT_FOUND);
		}
		List<Batch> batches = productBatchService.getBatchesByProduct(product);
		return new ResponseEntity<List<Batch>>(batches, HttpStatus.OK);
	}

	@RequestMapping(value="/category", method = RequestMethod.GET)
	public ResponseEntity<List<Category>> listAllCategories() {
		List<Category> categories = categoryService.getAll();
		if (categories.isEmpty()) {
			return new ResponseEntity(HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<List<Category>>(categories, HttpStatus.OK);
	}

	@RequestMapping(value = "/category", method = RequestMethod.PUT)
	public ResponseEntity<?> updateProduct(@RequestBody Category category) {
		if (category == null) {
			return new ResponseEntity(new CustomErrorType("Unable to find Category. Invalid Category"),
			HttpStatus.NOT_FOUND);

		}
		category = categoryService.updateCategory(category);
		return new ResponseEntity<Category>(category, HttpStatus.OK);
	}
	


	
}
