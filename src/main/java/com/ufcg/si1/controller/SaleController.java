package com.ufcg.si1.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PathVariable;

import com.ufcg.si1.model.Sale;
import com.ufcg.si1.service.SaleService;
import com.ufcg.si1.service.SaleServiceImpl;
import java.util.List;

@RestController
@RequestMapping("/api/sale")
@CrossOrigin
public class SaleController {

    @Autowired
    private SaleService saleService = new SaleServiceImpl();

    @RequestMapping(value="/{id}", method=RequestMethod.GET)
    public ResponseEntity<Sale> getSale(@PathVariable long id) {
        Sale sale = saleService.getSale(id);
        if(sale != null) {
            return new ResponseEntity<Sale>(sale, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping(method=RequestMethod.GET)
    public ResponseEntity<List<Sale>> getSales() {
        return new ResponseEntity<List<Sale>>(saleService.getSales(), HttpStatus.OK);
    }

    @RequestMapping(method=RequestMethod.POST)
    public ResponseEntity<Sale> saveSale(@RequestBody Sale sale) throws Exception{
        return new ResponseEntity<Sale>(saleService.saveSale(sale), HttpStatus.OK);
    }

    @RequestMapping(value="/{id}", method=RequestMethod.DELETE)
    public void deleteSale(@PathVariable long id) throws Exception{
        saleService.deleteSale(id);
    }
}