/**
 * 
 */
package no.hvl.dat152.rest.ws.controller;

import java.util.List;
import java.util.Set;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.Link;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import no.hvl.dat152.rest.ws.exceptions.OrderNotFoundException;
import no.hvl.dat152.rest.ws.exceptions.UserNotFoundException;
import no.hvl.dat152.rest.ws.model.Order;
import no.hvl.dat152.rest.ws.model.User;
import no.hvl.dat152.rest.ws.service.UserService;

/**
 * @author tdoy
 */
@RestController
@RequestMapping("/elibrary/api/v1")
public class UserController {

    // TODO Task 3: add endpoint access rules with @PreAuthorize.

	@Autowired
	private UserService userService;
	
	@GetMapping("/users")
	public ResponseEntity<Object> getUsers(){
		
		List<User> users = userService.findAllUsers();
		
		if(users.isEmpty())
			
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		else
			return new ResponseEntity<>(users, HttpStatus.OK);
	}
	
	@GetMapping(value = "/users/{id}")
	public ResponseEntity<Object> getUser(@PathVariable Long id) throws UserNotFoundException, OrderNotFoundException{
		
		User user = userService.findUser(id);
		
		return new ResponseEntity<>(user, HttpStatus.OK);
	}

    @PostMapping("/users")
    public ResponseEntity<User> createUser(@RequestBody User user) {

        user.setUserid(null);
        User savedUser = userService.saveUser(user);
        return new ResponseEntity<>(savedUser, HttpStatus.CREATED);
    }

    @PutMapping("/users/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User user) throws UserNotFoundException {

        User updatedUser = userService.updateUser(user, id);

        return new ResponseEntity<>(updatedUser, HttpStatus.OK);

    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<User> deleteUser(@PathVariable Long id) throws UserNotFoundException {

        userService.deleteUser(id);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/users/{id}/orders")
    public ResponseEntity<Object> getUserOrders(@PathVariable Long id) throws UserNotFoundException {

        Set<Order> orders = userService.getUserOrders(id);

        return new ResponseEntity<>(orders, HttpStatus.OK);
    }

    @GetMapping("/users/{id}/orders/{oid}")
    public ResponseEntity<Order> getUserOrder(@PathVariable Long id, @PathVariable Long oid) throws UserNotFoundException, OrderNotFoundException {

        Order order = userService.getUserOrder(id, oid);

        return new ResponseEntity<>(order, HttpStatus.OK);

    }

    @DeleteMapping("/users/{id}/orders/{oid}")
    public ResponseEntity<Void> deleteUserOrder(@PathVariable Long id, @PathVariable Long oid) throws UserNotFoundException, OrderNotFoundException {

        userService.deleteOrderForUser(id, oid);

        return new ResponseEntity<>(HttpStatus.OK);

    }

    @PostMapping("/users/{id}/orders")
    public ResponseEntity<Set<Order>> createUserOrder(@PathVariable Long id, @RequestBody Order order) throws UserNotFoundException {

        userService.createOrdersForUser(id, order);
        Set<Order> orders = userService.getUserOrders(id);

        for (Order savedOrder : orders) {
            savedOrder.add(
                    linkTo(OrderController.class).slash("orders").slash(savedOrder.getId()).withSelfRel(),
                    linkTo(UserController.class).slash("users").slash(id).slash("orders").withRel("user-orders")
            );
        }

        return new ResponseEntity<>(orders, HttpStatus.CREATED);

    }

	
}
