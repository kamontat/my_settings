#!/usr/bin/env bash
# shellcheck disable=SC1000

# generate by create-script-file v4.0.0
# link (https://github.com/Template-generator/create-script-file/tree/v4.0.0)

# set -x #DEBUG - Display commands and their arguments as they are executed.
# set -v #VERBOSE - Display shell input lines as they are read.
# set -n #EVALUATE - Check syntax of the script but don't execute.

help() {
	echo "-----------------------------------
Description: My personal computer settings.
How to:      Run the script to create new interaction prompt for setting computer
Option:       --help | -h | -? | help | h | ?
                > show this message
               --version | -v | version | v
                > show command version
-----------------------------------
Create by:    Kamontat Chantrachirathunrong <kamontat_c@hotmail.com>
Since:        29/11/2018
-----------------------------------
"
}

version() {
	echo "my-settings version: 0.0.1-alpha.0"
}

# @helper
throw() {
	printf '%s\n' "$1" >&2 && is_integer "$2" && exit "$2"
	return 0
}

# @helper
throw_if_empty() {
	local text="$1"
	test -z "$text" && throw "$2" "$3"
	return 0
}

# @option
require_argument() {
	throw_if_empty "$LONG_OPTVAL" "'$LONG_OPTARG' require argument" 9
}

# @option
no_argument() {
	[[ -n $LONG_OPTVAL ]] && ! [[ $LONG_OPTVAL =~ "-" ]] && throw "$LONG_OPTARG don't have argument" 9
	OPTIND=$((OPTIND - 1))
}

# @syscall
set_key_value_long_option() {
	if [[ $OPTARG =~ "=" ]]; then
		LONG_OPTVAL="${OPTARG#*=}"
		LONG_OPTARG="${OPTARG%%=$LONG_OPTVAL}"
	else
		LONG_OPTARG="$OPTARG"
		LONG_OPTVAL="$1"
		OPTIND=$((OPTIND + 1))
	fi
}

load_option() {
	while getopts 'Hh?Vv-:' flag; do
		case "${flag}" in
		H) help && exit 0 ;;
		h) help && exit 0 ;;
		\\?) help && exit 0 ;;
		V) version && exit 0 ;;
		v) version && exit 0 ;;
		-)
			export LONG_OPTARG
			export LONG_OPTVAL
			NEXT="${!OPTIND}"
			set_key_value_long_option "$NEXT"
			case "${OPTARG}" in
			help)
				no_argument
				help
				exit 0
				;;
			version)
				no_argument
				version
				exit 0
				;;
			*)
				# because optspec is assigned by 'getopts' command
				# shellcheck disable=SC2154
				if [ "$OPTERR" == 1 ] && [ "${optspec:0:1}" != ":" ]; then
					echo "Unexpected option '$LONG_OPTARG', run --help for more information" >&2
					exit 9
				fi
				;;
			esac
			;;
		?)
			echo "Unexpected option, run --help for more information" >&2
			exit 10
			;;
		*)
			echo "Unexpected option $flag, run --help for more information" >&2
			exit 10
			;;
		esac
	done
}

print_key_list() {
	local t1=""
	local t2=""
	local t3=""

	for file in "$@"; do
		if [[ $file =~ "setup" ]]; then
			t1=${file//setup-/}
			t2=${t1//.bash/}
			t3=${t2//--*/}
			printf "%s, " "$t3"
		fi
	done
	echo
}

print_option_list() {
	local t1=""
	local t2=""
	local t3=""

	for file in "$@"; do
		if [[ $file =~ "setup" ]]; then
			t1=${file//setup-/}
			t2=${t1//.bash/}
			t3=${t2//*--/}
			printf "%s, " "--$t3"
		fi
	done
	echo
}

load_option "$@"

root="$(dirname "$0")"
key="$1"
options="$2"
test -z "$options" && options="--no-internet"

# shellcheck disable=SC2207
list=($(ls "$root"))

if test -z "$key" || test -z "$options"; then
	echo "Usage: $0 <key> <option>. both key and option is required" >&2

	printf "Key:     "
	print_key_list "${list[@]}"
	printf "Options: "
	print_option_list "${list[@]}"
	exit 1
fi

filename="${root}/setup-${key}${options}.bash"

test -f "$filename"

# shellcheck disable=SC1090
source "$filename"

setup
