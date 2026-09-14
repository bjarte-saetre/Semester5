package no.hvl.dat152.js.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.repository.CrudRepository;

import jakarta.persistence.LockModeType;
import no.hvl.dat152.js.model.Student;

public interface StudentRepository extends CrudRepository<Student, Integer> {
    @Lock(LockModeType.PESSIMISTIC_WRITE)
    Optional<Student> findById(Integer id);

    @Lock(LockModeType.PESSIMISTIC_READ)
    Iterable<Student> findAll();
}
