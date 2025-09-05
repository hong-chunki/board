package com.example.board.utils;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.security.GeneralSecurityException;
import java.security.Key;
import java.security.NoSuchAlgorithmException;

import javax.crypto.Cipher;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;

import org.apache.commons.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import jakarta.annotation.PostConstruct;
@Component
public class AES256Utility {
    private String 	iv;
    private Key 	keySpec;
    
    @Value("${auth.aes256key}")
    private String aes256key;

    @PostConstruct
    public void init() throws IOException {
		final String KEY = aes256key;
		
		this.iv = KEY.substring(0, 16);
		
		byte[] keyBytes = new byte[16];
		byte[] b        = KEY.getBytes("UTF-8");
		
		int len = b.length;
		
		if ( len > keyBytes.length ) {
		    len = keyBytes.length;
		}
		
		System.arraycopy(b, 0, keyBytes, 0, len);
		SecretKeySpec keySpec = new SecretKeySpec(keyBytes, "AES");
		
		this.keySpec = keySpec;
    }
    
    
    public String encrypt( String str ) throws NoSuchAlgorithmException, GeneralSecurityException, UnsupportedEncodingException {
		Cipher cipher = Cipher.getInstance( "AES/CBC/PKCS5Padding" );
		
		cipher.init( Cipher.ENCRYPT_MODE, keySpec , new IvParameterSpec( iv.getBytes() ));
		
		byte[] encrypted = cipher.doFinal( str.getBytes("UTF-8") );
		
		String encrypted_str = new String( Base64.encodeBase64( encrypted ) );
		
		return encrypted_str;
    }
    
    
    public String decrypt(String str) throws NoSuchAlgorithmException, GeneralSecurityException, UnsupportedEncodingException {
		Cipher cipher = Cipher.getInstance( "AES/CBC/PKCS5Padding" );
		cipher.init( Cipher.DECRYPT_MODE, keySpec, new IvParameterSpec(iv.getBytes()) );
		byte[] byte_str = Base64.decodeBase64( str.getBytes() );
		return new String( cipher.doFinal( byte_str ), "UTF-8" );
    }
    
}
