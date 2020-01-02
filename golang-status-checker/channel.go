package main

import (
	"fmt"
	"net/http"
	"time"
)

func newSiteList() []string {
	return []string{
		"http://google.com",
		"http://facebook.com",
		"http://stackoverflow.com",
		"http://golang.com",
	}
}

func checkLinks(ls []string) {
	c := make(chan string)
	for _, link := range ls {
		go getRequestFromURL(link, c)
	}
	for l := range c {

		go func(l string) {
			time.Sleep(time.Second)
			getRequestFromURL(l, c)
		}(l)
	}
}

//function literal

func getRequestFromURL(li string, c chan string) {
	resp, err := http.Get(li)
	if err != nil {
		fmt.Println("server down", err)
		c <- li
		return
	}
	if resp.StatusCode == 200 {
		fmt.Println(li, resp.StatusCode)
		c <- li
		return
	}
	fmt.Println(li, "server not ok, code: %v", resp.StatusCode)
	c <- li
}
