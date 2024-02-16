package com.example.backend.services;

import com.example.backend.dtos.UserLoginDTO;
import com.example.backend.dtos.UserRegisterDTO;
import com.example.backend.entities.User;
import com.example.backend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Objects;
import java.util.Optional;

@Service
public class UserValidationService {
    private final UserRepository userRepository;

    @Autowired
    public UserValidationService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    private boolean isNotValidString(String s) {
        return s == null || s.isBlank() || s.isEmpty();
    }

    public void validateUserRegisterBody(UserRegisterDTO user) {
        if(isNotValidString(user.getEmail())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "И-мэйл заавал шаардлагатай");
        }

        Optional<User> optionalUser = userRepository.findUserByEmail(user.getEmail());
        if(optionalUser.isPresent()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "И-мэйл бүртгэлтэй байна");
        }

        if(isNotValidString(user.getFirstName())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Нэр заавал шаардлагатай");
        }

        if(isNotValidString(user.getLastName())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Овог заавал шаардлагатай");
        }

        if(isNotValidString(user.getPassword())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Нууц үг заавал шаардлагатай");
        }
        if(isNotValidString(user.getPasswordConfirmation())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Нууц үг давтан оруулах шаардлагатай");
        }
        if(!Objects.equals(user.getPassword(), user.getPasswordConfirmation())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Нууц үг хоорондоо таарахгүй байна");
        }

        if(user.getPassword().length() < 8) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Нууц үг шаардлага хангахгүй байна");
        }

        if(isNotValidString(user.getGender())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Хүйс заавал сонгох шаардлагатай");
        }

        if(user.getSectionId() == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Хэлтэс заавал сонгох шаардлагатай");
        }
    }

    public void validateUserLoginBody(UserLoginDTO userLoginDTO) {
        if(isNotValidString(userLoginDTO.getEmail())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "И-мэйл хоосон байна");
        }

        if(isNotValidString(userLoginDTO.getPassword())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Нууц үг хоосон байна");
        }

    }
}
