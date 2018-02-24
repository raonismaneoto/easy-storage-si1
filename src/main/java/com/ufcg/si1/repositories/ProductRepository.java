package src.main.java.com.ufcg.si1.repositories;
import org.springframework.data.jpa.repository.JpaRepository;
import src.main.java.com.ufcg.si1.model.Produto;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Produto, String> {
}