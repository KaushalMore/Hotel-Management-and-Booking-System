package com.hotel.hotelmore.service.impl;

import com.hotel.hotelmore.entity.Booking;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Set;
import java.util.concurrent.TimeUnit;

@Service
@Slf4j
@RequiredArgsConstructor
public class LockService {

    private final StringRedisTemplate redisTemplate;

    public boolean acquireLock(String key, String userId, long timeout) {
        Boolean success = redisTemplate.opsForValue().setIfAbsent(key, userId, timeout, TimeUnit.SECONDS);
        log.info(success != null && success ? "Lock acquired for key: {} by user: {}" : "Failed to acquire lock for key: {}, value: {}", key, userId);
        return success != null && success;
    }

    public void releaseLock(String key, String userId) {
        String lockValue = redisTemplate.opsForValue().get(key);
        log.info("Releasing lock for key: {}, lockValue: {}", key, lockValue);
        if (lockValue != null && lockValue.equals(userId)) {
            redisTemplate.delete(key);
            log.info("Lock released successfully for key: {}", key);
        } else {
            log.warn("Lock release failed for key: {}, lockValue: {}", key, lockValue);
        }
    }

    public boolean isLockedBy(String key, String userId) {
        String lockValue = redisTemplate.opsForValue().get(key);
        log.info("Checking lock for key: {}, expected lockValue: {}, actual lockValue: {}", key, userId, lockValue);
        return lockValue != null && lockValue.equals(userId);
    }

    public boolean extendLock(String key, long additionalTimeout, String userId) {
        String lockValue = redisTemplate.opsForValue().get(key);
        if (lockValue != null && lockValue.equals(userId)) {
            redisTemplate.expire(key, additionalTimeout, TimeUnit.SECONDS);
            log.info("Extended lock for key: {} by user: {} for additional {} seconds", key, userId, additionalTimeout);
            return true;
        }
        return false;
    }

    public boolean hasOverlappingLocks(Long roomId, Booking bookingRequest) {
        Set<String> keys = redisTemplate.keys(roomId + ":*");
        for (String key : keys) {
            String[] parts = key.split(":");
            LocalDate checkInDate = LocalDate.parse(parts[1]);
            LocalDate checkOutDate = LocalDate.parse(parts[2]);
            if (bookingRequest.getCheckInDate().isBefore(checkOutDate) && bookingRequest.getCheckOutDate().isAfter(checkInDate)) {
                return true;
            }
        }
        return false;
    }

}