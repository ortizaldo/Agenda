<?php
class DAO {
   var $server='localhost';
    var $admin='root';
    var $pass='';
    var $base='grupoti';
    function __Construct() {
        
    }
    public function getConnect() {
        $connection = new mysqli($this->server, $this->admin, $this->pass, $this->base);
        $charset = 'utf8';
        $connection->set_charset($charset);
        
        return $connection;
    }
}
?>