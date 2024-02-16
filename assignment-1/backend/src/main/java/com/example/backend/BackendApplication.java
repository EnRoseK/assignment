package com.example.backend;

import com.example.backend.entities.Section;
import com.example.backend.repositories.SectionRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.List;

@SpringBootApplication
public class BackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}

	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/**").allowedMethods("*").allowedOrigins("*");
			}
		};
	}

	@Bean
	CommandLineRunner commandLineRunner(SectionRepository sectionRepository) {
		return args -> {
			Section it = new Section("Мэдээлэл технологи", "Мэдээлэл технологийн хэлтэс");
			Section hr = new Section("Хүний нөөц", "Хүний нөөцийн хэлтэс");
			Section finance = new Section("Санхүү", "Санхүүгийн хэлтэс");

			sectionRepository.saveAll(
					List.of(it, hr, finance)
			);
		};
	}

}
