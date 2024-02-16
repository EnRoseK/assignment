package com.example.backend.services;

import com.example.backend.dtos.UserLoginDTO;
import com.example.backend.dtos.UserRegisterDTO;
import com.example.backend.entities.Section;
import com.example.backend.entities.User;
import com.example.backend.repositories.SectionRepository;
import com.example.backend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;


import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final SectionRepository sectionRepository;
    private final UserValidationService userValidationService;

    @Autowired
    public UserService(UserRepository userRepository, UserValidationService userValidationService, SectionRepository sectionRepository) {
        this.userRepository = userRepository;
        this.userValidationService = userValidationService;
        this.sectionRepository = sectionRepository;
    }

    public List<User> getUsers() {
        return userRepository.findAll();
    }

    public User registerUser(UserRegisterDTO user) {
        userValidationService.validateUserRegisterBody(user);

        Optional<Section> optionalSection = sectionRepository.findById(user.getSectionId());
        if(optionalSection.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Сонгосон хэлтэс олдсонгүй");
        }

        return userRepository.save(user.toUser(optionalSection.get()));
    }

    public User loginUser(UserLoginDTO userLoginDTO) {
        userValidationService.validateUserLoginBody(userLoginDTO);

        Optional<User> optionalUser = userRepository.findUserByEmail(userLoginDTO.getEmail());
        if(optionalUser.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "И-мэйл эсвэл нууц үг буруу байна");
        }

        if(!optionalUser.get().getPassword().equals(userLoginDTO.getPassword())) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "И-мэйл эсвэл нууц үг буруу байна");
        }

        return optionalUser.get();
    }
}
