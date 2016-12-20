package cn.darkshadow.api.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.Assert;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import cn.darkshadow.api.domain.User;
import cn.darkshadow.api.service.UserService;

@RestController
@RequestMapping(value = "/api/user")
public class UserController {

	private final Logger log = LoggerFactory.getLogger(UserController.class);

	@Autowired
	protected UserService userService;

	/**
	 * GET /users -> get all the users
	 */
	@RequestMapping(value = "/users", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity getAll() {
		log.debug("REST request to get all Users");
		return new ResponseEntity<>(userService.findAll(), HttpStatus.OK);
	}

	/**
	 * GET /users/:username -> get the "username" user
	 */
	@RequestMapping(value = "/users/{username}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public User getUser(@PathVariable String username,
			HttpServletResponse response) {
		log.debug("REST request to get User : {}", username);
		User user = userService.findOneByUsername(username);
		if (user == null) {
			response.setStatus(HttpServletResponse.SC_NOT_FOUND);
		}
		return user;
	}

	/**
	 * POST /users -> create a new user
	 */
	@RequestMapping(value = "/users", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?> create(@Valid @RequestBody User userDto,
			HttpServletRequest request) {
		User user = userService.findOneByUsername(userDto.getUsername());
		if (user != null) {
			return ResponseEntity.badRequest()
					.contentType(MediaType.TEXT_PLAIN)
					.body("username already in use");
		}
		userService.insert(userDto);
		return new ResponseEntity<>(HttpStatus.CREATED);
	}

	/**
	 * POST /users/change_password -> changes the current user's password
	 */
	@RequestMapping(value = "/users/change_password", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<String> changePassword(@RequestBody User user) {
		final String password = user.getPassword();
		final String username = user.getUsername();
		Assert.notNull(password);
		Assert.notNull(username);
		if (password.isEmpty() || password.length() < 5
				|| password.length() > 50
				|| user.getUsername() == null) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
		userService.changePassword(user);
		return new ResponseEntity<>(HttpStatus.OK);
	}

}
