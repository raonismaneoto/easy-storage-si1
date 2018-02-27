package com.ufcg.si1.model.DTO;

public class BatchDTO {

    private int numberOfItems;
    private String expirationDate;

    public BatchDTO() {}

    public BatchDTO(int numberOfItens, String expirationDate) {
        super();
        this.numberOfItems = numberOfItens;
        this.expirationDate = expirationDate;
    }

    public int getNumberOfItems() {
        return numberOfItems;
    }

    public void setNumberOfItems(int numberOfItems) {
        this.numberOfItems = numberOfItems;
    }

    public String getExpirationDate() {
        return expirationDate;
    }

    public void setExpirationDate(String expirationDate) {
        this.expirationDate = expirationDate;
    }
}
