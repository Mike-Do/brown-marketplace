package edu.brown.cs.student.main.Structures;

import java.util.List;

public class User {
  private int id;
  private String userName;
  private String actualName;
  private String profilePicUrl;
  private String email;
  private String classYear;
  private List<Integer> listings;
  private List<Integer> referrals;
  private List<Integer> wishingList;
  private List<Integer> likedItems;
  private List<Integer> bookmarkedItems;
  private List<Integer> dislikedItems;

  public User(int id, String userName, String actualName, String profilePicUrl, String email,
              String classYear, List<Integer> listings, List<Integer> referrals,
              List<Integer> wishingList, List<Integer> likedItems, List<Integer> bookmarkedItems,
              List<Integer> dislikedItems) {
    this.id = id;
    this.userName = userName;
    this.actualName = actualName;
    this.profilePicUrl = profilePicUrl;
    this.email = email;
    this.classYear = classYear;
    this.listings = listings;
    this.referrals = referrals;
    this.wishingList = wishingList;
    this.likedItems = likedItems;
    this.bookmarkedItems = bookmarkedItems;
    this.dislikedItems = dislikedItems;
  }

  public int getId() {
    return this.id;
  }

  public void setId(int id) {
    this.id = id;
  }

  public String getUserName() {
    return this.userName;
  }

  public void setUserName(String userName) {
    this.userName = userName;
  }

  public String getActualName() {
    return this.actualName;
  }

  public void setActualName(String actualName) {
    this.actualName = actualName;
  }

  public String getProfilePicUrl() {
    return this.profilePicUrl;
  }

  public void setProfilePicUrl(String profilePicUrl) {
    this.profilePicUrl = profilePicUrl;
  }

  public String getEmail() {
    return this.email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public String getClassYear() {
    return this.classYear;
  }

  public void setClassYear(String classYear) {
    this.classYear = classYear;
  }

  public List<Integer> getListings() {
    return this.listings;
  }

  public void setListings(List<Integer> listings) {
    this.listings = listings;
  }

  public List<Integer> getReferrals() {
    return this.referrals;
  }

  public void setReferrals(List<Integer> referrals) {
    this.referrals = referrals;
  }

  public List<Integer> getWishingList() {
    return this.wishingList;
  }

  public void setWishingList(List<Integer> wishingList) {
    this.wishingList = wishingList;
  }

  public List<Integer> getLikedItems() {
    return this.likedItems;
  }

  public void setLikedItems(List<Integer> likedItems) {
    this.likedItems = likedItems;
  }

  public List<Integer> getBookmarkedItems() {
    return this.bookmarkedItems;
  }

  public void setBookmarkedItems(List<Integer> bookmarkedItems) {
    this.bookmarkedItems = bookmarkedItems;
  }

  public List<Integer> getDislikedItems() {
    return this.dislikedItems;
  }

  public void setDislikedItems(List<Integer> dislikedItems) {
    this.dislikedItems = dislikedItems;
  }
}