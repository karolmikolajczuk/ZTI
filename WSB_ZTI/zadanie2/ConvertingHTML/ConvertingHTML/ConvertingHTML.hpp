#pragma once

#include <string>
#include <fstream>
#include <exception>
#include <iostream>

#include <algorithm>
#include <regex>

static unsigned int number_of_hash = 0;

// method for replacing sub strings
std::string  replaceStringInPlace(std::string subject, const std::string& search,
	const std::string& replace) {
	std::cout << __FUNCTION__ << '\n';
	size_t pos = 0;
	while ((pos = subject.find(search, pos)) != std::string::npos) {
		subject.replace(pos, search.length(), replace);
		pos += replace.length();
	}

	return subject;
}

int appearances(std::string line, std::string target) {
	std::cout << __FUNCTION__ << '\n';
	int count = 0, pos = 0;
	while ((pos = line.find(target, pos)) != std::string::npos) {
		++count;
		pos += target.length();
	}

	return count;
}

// functions helpful for converting
std::string angleBrackets(std::string line) {
	std::cout << __FUNCTION__ << '\n';
	const std::string fromLEFT = ">>";
	const std::string fromRIGHT = "<<";

	const std::string toLEFT = "<q>";
	const std::string toRIGHT = "</q>";

	int countLEFT = appearances(line, fromLEFT);
	int countRIGHT = appearances(line, fromRIGHT);

	if (countLEFT != countRIGHT) throw std::exception("lack of tag >> <<");
	
	std::string afterLeft = replaceStringInPlace(line, fromLEFT, toLEFT);
	return replaceStringInPlace(afterLeft, fromRIGHT, toRIGHT);
}

std::string oneAsterisk(std::string line) {
	std::cout << __FUNCTION__ << '\n';

	if (appearances(line, "*") % 2 != 0)
		throw std::exception("lack of tag *");

	const std::string fromLEFT = "*";
	
	// initialize
	int index_lfind = 0, count = 1;

	while ((index_lfind = line.find(fromLEFT, index_lfind)) != std::string::npos) {

		// replace the left one
		if (count % 2 != 0) { line.replace(index_lfind, 1, "<em>"); }

		// replace the right one
		if (count % 2 == 0) { line.replace(index_lfind, 1, "</em>"); }

		index_lfind = fromLEFT.length();
		++count;
	}
	
	std::cout << "After: " << line << '\n';
	return line;
}

std::string twoAsterisks(std::string line) {
	std::cout << __FUNCTION__ << '\n';

	if (appearances(line, "**") % 2 != 0)
		throw std::exception("lack of tag **");

	const std::string fromLEFT = "**";

	// initialize
	int index_lfind = 0, count = 1;

	while ((index_lfind = line.find(fromLEFT, index_lfind)) != std::string::npos) {

		// replace the left one
		if (count % 2 != 0) { line.replace(index_lfind, 2, "<strong>"); }

		// replace the right one
		if (count % 2 == 0) { line.replace(index_lfind, 2, "</strong>"); }

		index_lfind = fromLEFT.length(); 
		++count;
	}

	std::cout << "After: " << line << '\n';
	return line;
}

std::string underlineExclMark(std::string line) {
	std::cout << __FUNCTION__ << '\n';
	int count_LEFT = appearances(line, "_!");
	int count_RIGHT = appearances(line, "!_");
	if (count_LEFT != count_RIGHT)
		throw std::exception("lack of tag _! !_");

	const std::string fromLEFT = "_!";
	const std::string fromRIGHT = "!_";
	const std::string toLEFT = "<ins>";
	const std::string toRIGHT = "</ins>";

	std::string afterLeft = replaceStringInPlace(line, fromLEFT, toLEFT);
	return replaceStringInPlace(afterLeft, fromRIGHT, toRIGHT);
}

std::string dashExclMark(std::string line) {
	std::cout << __FUNCTION__ << '\n';
	int countLEFT = appearances(line, "-!");
	int countRIGHT = appearances(line, "!-");

	if (countLEFT != countRIGHT)
		throw std::exception("lack of tag -! !-");

	const std::string fromLEFT = "-!";
	const std::string fromRIGHT = "!-";
	const std::string toLEFT = "<del>";
	const std::string toRIGHT = "</del>";

	std::string afterLeft = replaceStringInPlace(line, fromLEFT, toLEFT);
	return replaceStringInPlace(afterLeft, fromRIGHT, toRIGHT);
}

std::string bracketsPipe(std::string line) {
	std::cout << __FUNCTION__ << '\n';

	if (line.find('[') == std::string::npos ||
		line.find('|') == std::string::npos ||
		line.find(']') == std::string::npos)
		throw std::exception("No tag [ | ]");

	int index_left_bracket = line.find('[');
	int index_right_bracket = line.rfind(']');
	int index_pipe = line.find('|');

	return "<a href=\"" + line.substr(index_left_bracket+1, index_pipe-(index_left_bracket+1)) + 
		"\">" + line.substr(index_pipe+1, index_right_bracket-(index_pipe+1)) + "</a>";
}

std::string hash(std::string line) {
	std::cout << __FUNCTION__ << '\n';
	if (line.at(0) != '#') {
		return line;
	}

	++number_of_hash;

	return "<h1 id=\"n" + std::to_string(number_of_hash) + "\">" + line.substr(1) + "</h1>";
}

std::string curlyBraces(std::string line) {
	std::cout << __FUNCTION__ << ':' << line << '\n';

	if (line.find('{') == std::string::npos ||
		line.find('|') == std::string::npos ||
		line.find('}') == std::string::npos)
		throw std::exception("No tag { | }");

	int index_left_curly = line.find('{');
	int index_right_curly = line.find('}');
	int index_pipe = line.find('|');
	int index_text = index_right_curly + 1;

	return "<aside cat=\"" + line.substr(index_left_curly + 1, index_pipe - (index_left_curly + 1)) + "\">" +
		"<header>" + line.substr(index_pipe + 1, index_right_curly - (index_pipe + 1)) + "</header>" +
		"<main>" + line.substr(index_text) + "</main></aside>";
}

std::string straightText(std::string line) {
	std::cout << __FUNCTION__ << '\n';
	bool contains_text_only =
		line.find_first_not_of("abcdefghijklmnopqrstuvwxyz0123456789 ") == std::string::npos;

	if (!contains_text_only) {
		return line;
	}

	return "<p>" + line + "</p>";
}

void parseFile(std::string path) {
	std::cout << __FUNCTION__ << '\n';

	// create file
	std::fstream file;
	file.open(path, std::ios::in | std::ios::out);

	// check if file exists
	if (!file.good()) throw std::exception("Wrong file path probably.");

	// create target file
	std::fstream result;
	result.open("result.html", std::ios::in | std::ios::out | std::ios::app);

	// till end of file
	while (!file.eof()) {
		std::cout << "Loop\n";

		// line read from file
		std::string line;

		// set line from file into string
		//file >> line;
		std::getline(file, line);

		std::cout << "[BEFORE ALL CONVERTS]: " << line << '\n';

		// convert data
		try {
			line = angleBrackets(line);
		}
		catch (std::exception e) {
			std::cout << e.what() << '\n';
		}

		try {
			line = twoAsterisks(line);
		}
		catch (std::exception e) {
			std::cout << e.what() << '\n';
		}

		try {
			line = oneAsterisk(line);
		}
		catch (std::exception e) {
			std::cout << e.what() << '\n';
		}

		try {
			line = underlineExclMark(line);
		}
		catch (std::exception e) {
			std::cout << e.what() << '\n';
		}

		try {
			line = dashExclMark(line);
		}
		catch (std::exception e) {
			std::cout << e.what() << '\n';
		}

		try {
			line = bracketsPipe(line);
		}
		catch (std::exception e) {
			std::cout << e.what() << '\n';
		}

		try {
			line = hash(line);
		}
		catch (std::exception e) {
			std::cout << e.what() << '\n';
		}

		try {
			line = curlyBraces(line);
		}
		catch (std::exception e) {
			std::cout << e.what() << '\n';
		}

		try {
			line = straightText(line);
		}
		catch (std::exception e) {
			std::cout << e.what() << '\n';
		}

		std::cout << "[AFTER ALL CONVERTS]: " << line << '\n';
		std::cout << "----------\n";

		// insert data
		result << line << '\n';
	}

	file.close();
	result.close();
}