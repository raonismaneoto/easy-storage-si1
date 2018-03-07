package com.ufcg.si1.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ufcg.si1.dataBaseOperations.DataBaseOperations;
import com.ufcg.si1.model.Sale;
import java.util.List;

@Service("saleService")
public class SaleServiceImpl implements SaleService {
    
    @Autowired
    private DataBaseOperations dataBaseOperations;

    @Override
    public Sale saveSale(Sale sale) {
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
        dataBaseOperations.deleteSale(id);
    }
}