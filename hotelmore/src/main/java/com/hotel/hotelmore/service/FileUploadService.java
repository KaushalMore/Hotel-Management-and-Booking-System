package com.hotel.hotelmore.service;


import com.hotel.hotelmore.exception.MyException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Objects;

@Service
public class FileUploadService {

    //    public final String UPLOAD_DIR = "C:\\Users\\kaushal More\\Project\\Hotel management\\images";
    public final String UPLOAD_DIR = "C:\\Users\\kaushal More\\Project\\Hotel management\\hotel-more\\public\\images";

    public String uploadFile(MultipartFile photo) {
        try {
            if (photo == null || photo.isEmpty()) {
                return null;
            }
            String filename = photo.getOriginalFilename();
            String path = UPLOAD_DIR + File.separator + filename;

            // Check if content type is a valid image format
            if (!isImageContentType(photo.getContentType())) {
                throw new MyException("Invalid file type. Only images are allowed.");
            }

            Files.copy(photo.getInputStream(), Paths.get(path), StandardCopyOption.REPLACE_EXISTING);
            System.out.println("public\\images" + File.separator + filename);
            return path;
        } catch (Exception e) {
            throw new MyException("Unable to upload image to local storage : " + e.getMessage());
        }
    }

    private boolean isImageContentType(String contentType) {
        // Add common image content types to the list
        String[] validImageTypes = {"image/jpeg", "image/png", "image/gif", "application/octet-stream"};
        for (String validType : validImageTypes) {
            if (Objects.equals(contentType, validType)) {
                return true;
            }
        }
        return false;
    }


}
