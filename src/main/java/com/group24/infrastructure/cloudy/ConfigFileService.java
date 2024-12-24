package com.group24.infrastructure.cloudy;

import com.cloudinary.Cloudinary;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.HashMap;
import java.util.Map;

@Configuration
public class ConfigFileService {
    private final String CLOUD_NAME = "dcwkiozwf";
    private final String API_KEY = "912558737893343";
    private final String API_SECRET = "SfOVjhYi36Zq4SS239IyimIvaNk";
    @Bean
    public Cloudinary cloudinary(){
        Map<String, String> config = new HashMap<>();
        config.put("cloud_name",CLOUD_NAME);
        config.put("api_key",API_KEY);
        config.put("api_secret",API_SECRET);
        return new Cloudinary(config);
    }
}
