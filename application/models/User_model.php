<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class User_model extends CI_MODEL{
  
  public $user_id = null;
  public $nickname;
  public $password;
  public $name;
  public $lastname;
  public $dni;
  public $type;


  //constructor
  public function __construct(){
    parent::__construct();
    $this->load->database();
  }

  function organize_data($data){

    $this->nickname = $data['nickname'];
    $this->password = password_hash($data['password'], PASSWORD_DEFAULT);
    $this->name     = $data['name'];
    $this->lastname = $data['lastname'];
    $this->dni      = $data['dni'];
    $this->type     = $data['type'];
  }



  public function add_new_user($data){
    $this->organize_data($data);
    if($this->db->insert('users',$this)){
      return " it's ok";
    }else{
      return "something bad";
    }
    
  }

  

  //functions
}