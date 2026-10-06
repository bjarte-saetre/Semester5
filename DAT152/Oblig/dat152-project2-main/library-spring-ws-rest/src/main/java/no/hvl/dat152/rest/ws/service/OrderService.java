/**
 * 
 */
package no.hvl.dat152.rest.ws.service;

import java.util.List;

import java.time.LocalDate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import no.hvl.dat152.rest.ws.exceptions.OrderNotFoundException;
import no.hvl.dat152.rest.ws.model.Order;
import no.hvl.dat152.rest.ws.repository.OrderRepository;

/**
 * @author tdoy
 */
@Service
public class OrderService {

	@Autowired
	private OrderRepository orderRepository;
	
	public Order saveOrder(Order order) {
		
		order = orderRepository.save(order);
		
		return order;
	}
	
	public Order findOrder(Long id) throws OrderNotFoundException {
		
		Order order = orderRepository.findById(id)
				.orElseThrow(()-> new OrderNotFoundException("Order with id: "+id+" not found in the order list!"));
		
		return order;
	}
	
	public void deleteOrder(Long id) throws OrderNotFoundException {
        findOrder(id); //sjekker om ordren finnes
        orderRepository.deleteById(id);
    }
	
	public List<Order> findAllOrders() {
        return orderRepository.findAll();
    }

    public List<Order> findAllOrders(Pageable pageable) {
        return orderRepository.findAll(pageable).getContent();
    }
	
	public List<Order> findByExpiryDate(LocalDate expiry, Pageable page) {
        return orderRepository.findByExpiryBefore(expiry.plusDays(1), page).getContent();
    }
	
	public Order updateOrder(Order order, Long id) throws OrderNotFoundException {
        Order existingOrder = findOrder(id);

        if (order.getIsbn() != null) {
            existingOrder.setIsbn(order.getIsbn());
        }

        if (order.getExpiry() != null) {
            existingOrder.setExpiry(order.getExpiry());
        }
        return orderRepository.save(existingOrder);

    }
}
