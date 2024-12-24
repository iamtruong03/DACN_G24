package com.group24.repositories;

import com.group24.entities.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository(TransactionRepository.NAME)
public interface TransactionRepository extends JpaRepository<Transaction, String> {
    public static final String NAME = "BaseTransactionRepository";
}
